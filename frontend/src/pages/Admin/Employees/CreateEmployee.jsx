import {
    faBirthdayCake,
    faBuilding,
    faCity,
    faFlag,
    faHouseUser,
    faIdBadge,
    faIdCard,
    faMailBulk,
    faPhone,
    faRoad,
    faSortNumericUpAlt,
    faStreetView,
    faUserMd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef } from "react";
import FullScreenModal, { FullScreenModalFooter, FullScreenCloseButton, FullScreenModalBody } from "../../../components/sub/modal/FullScreenModal";
import useAlert from "../../../hooks/AlertHook";
import useBrasilState from "../../../hooks/BrasilStatesHook";
import useWorldCountries from "../../../hooks/WorldCountriesHook";
import { useUser } from "../../../provider/UserProvider";

const CreateEmployee = ({ buttonRef, refreshEmployees }) => {
    const { authenticatedFetch } = useUser();
    const [alert, createAlert] = useAlert();
    const formRef = useRef();
    const [states] = useBrasilState();
    const [countries] = useWorldCountries();
    const handleCEPFill = useCallback(async (e) => {
        const value = e.target.value;
        if (value.replace(/\D/, "") !== value) {
            e.target.value = value.replace(/\D/, "");
            return;
        }
        const form = formRef.current;
        if (form.address_zip.value.length !== 8) {
            return;
        }
        const timeoutId = setTimeout(async () => {
            try {
                const req = await fetch(`https://viacep.com.br/ws/${form.address_zip.value}/json/`);
                if (req.status === 200) {
                    const jsonData = await req.json();
                    if (jsonData.logradouro) form.address_street.value = jsonData.logradouro;
                    if (jsonData.localidade) form.address_city.value = jsonData.localidade;
                    if (jsonData.bairro) form.address_neighborhood.value = jsonData.bairro;
                    if (jsonData.uf) form.address_state.value = jsonData.uf;
                }
            } catch (err) {
                console.log(err);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);
    const alertMissingField = useCallback(
        (field_name) => {
            createAlert(`Ocorreu um erro ao criar o funcionario, o campo ${field_name} é invalido`, "danger", true);
        },
        [createAlert]
    );

    const registerNewClient = useCallback(async () => {
        const form = formRef.current;

        const cpf_cnpj = form.cpf_cnpj.value;
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address_zip = form.address_zip.value;
        const address_street = form.address_street.value;
        const address_neighborhood = form.address_neighborhood.value;
        const address_number = form.address_number.value;
        const address_country = form.address_country.value;
        const address_city = form.address_city.value;
        const address_state = form.address_state.value;
        const birthday = form.birthday.value;
        const password = makeid(10);
        const role = form.role.value;

        if (!cpf_cnpj) return alertMissingField("CPF/CNPJ");
        if (!first_name) return alertMissingField("Nome");
        if (!last_name) return alertMissingField("Sobrenome");
        if (!email) return alertMissingField("E-mail");
        if (!phone) return alertMissingField("Telefone");
        if (!address_zip) return alertMissingField("CEP");
        if (!address_street) return alertMissingField("Rua");
        if (!address_neighborhood) return alertMissingField("Bairro");
        if (!address_number) return alertMissingField("Número");
        if (!address_country) return alertMissingField("País");
        if (!address_city) return alertMissingField("Cidade");
        if (!address_state) return alertMissingField("Estado");
        if (!address_city) return alertMissingField("Data de aniversario");
        if (!role) return alertMissingField("Função");

        const data = await authenticatedFetch("company/employee/create", {
            body: {
                cpf_cnpj,
                first_name,
                last_name,
                email,
                phone,
                password,
                address_zip,
                address_street,
                address_neighborhood,
                address_number,
                address_country,
                address_city,
                address_state,
                birthday,
                role,
            },
        });

        if (!data.data && !data.success) {
            createAlert("Ocorreu um erro ao criar o funcionario, por favor contate um administrador", "danger", true);
            return;
        }

        if (data.data && data.data.code && data.data.code === 2) {
            createAlert("Ocorreu um erro ao criar o funcionario, você já possui um funcionario com esse CPF", "danger", true);
            return;
        }

        if (data.data && data.data.code && data.data.code === 1) {
            createAlert("Ocorreu um erro ao criar o funcionario, você já possui um cliente com esse CPF", "danger", true);
            return;
        }

        createAlert("Funcionario registrado com sucesso!", "success", true);
        form.reset();
        refreshEmployees();
    }, [authenticatedFetch, createAlert, alertMissingField, refreshEmployees]);
    return (
        <>
            {alert}
            <FullScreenModal title={"Registrar novo funcionario"} toggleButtonRef={buttonRef}>
                <FullScreenModalBody>
                    <form ref={formRef} className="row">
                        <h6 className="mb-3">Informações do funcionario</h6>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faIdCard} />
                                </span>
                                <input id="first_name" type="text" className="form-control" placeholder="Nome" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faIdCard} />
                                </span>
                                <input id="last_name" type="text" className="form-control" placeholder="Sobrenome" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faIdBadge} />
                                </span>
                                <input id="cpf_cnpj" type="number" className="form-control" placeholder="CPF" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faMailBulk} />
                                </span>
                                <input id="email" type="email" className="form-control" placeholder="E-mail" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <input id="phone" type="number" className="form-control" placeholder="Telefone" />
                            </div>
                        </div>
                        <hr />
                        <h6 className="mb-3">Endereço do funcionario</h6>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faStreetView} />
                                </span>
                                <input id="address_zip" type="text" className="form-control" placeholder="CEP" onChange={handleCEPFill} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faRoad} />
                                </span>
                                <input id="address_street" type="text" className="form-control" placeholder="Rua" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faHouseUser} />
                                </span>
                                <input id="address_neighborhood" type="text" className="form-control" placeholder="Bairro" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faSortNumericUpAlt} />
                                </span>
                                <input id="address_number" type="number" className="form-control" placeholder="Numero" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faCity} />
                                </span>
                                <input id="address_city" type="text" className="form-control" placeholder="Cidade" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faBuilding} />
                                </span>
                                <select id="address_state" className="form-select" aria-label="Estado Selector">
                                    <option>Selecione um estado</option>
                                    {states.map((estado, id) => (
                                        <option key={id} value={estado.sigla}>
                                            {estado.sigla + " - " + estado.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faFlag} />
                                </span>
                                <select id="address_country" className="form-select" aria-label="Estado Selector" defaultValue="BR">
                                    {countries.map((country, id) => (
                                        <option key={id} value={country.code}>
                                            {country.code + " - " + country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faBirthdayCake} />
                                </span>
                                <input id="birthday" type="date" className="form-control" placeholder="Aniversario" />
                            </div>
                        </div>
                        <hr />
                        <h6 className="mb-3">Função do funcionario</h6>
                        <div className="col-12 col-md-6">
                            <label htmlFor="role" className="form-label">
                                Função
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUserMd} />
                                </span>
                                <select id="role" className="form-select" aria-label="Estado Selector" defaultValue={"BR"}>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="MANAGER">Recepcionista</option>
                                    <option value="DOCTOR">Psicologo</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <h6 className="mb-3">Informações adcionais</h6>
                    </form>
                    <p>A senha temporaria do funcionario será enviada para o e-mail cadastrado, onde o mesmo poderá realizar as devidas alterações.</p>
                </FullScreenModalBody>
                <FullScreenModalFooter>
                    <FullScreenCloseButton className="btn btn-success text-white" onClick={registerNewClient}>
                        Registrar
                    </FullScreenCloseButton>
                    <FullScreenCloseButton className="btn btn-primary text-white">Cancelar</FullScreenCloseButton>
                </FullScreenModalFooter>
            </FullScreenModal>
        </>
    );
};

function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export default CreateEmployee;
