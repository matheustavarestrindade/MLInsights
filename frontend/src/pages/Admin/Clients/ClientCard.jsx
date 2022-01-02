import {
    faBirthdayCake,
    faBuilding,
    faCity,
    faFlag,
    faHouseUser,
    faIdBadge,
    faIdCard,
    faKey,
    faMailBulk,
    faPhone,
    faRoad,
    faSave,
    faSortNumericUpAlt,
    faStreetView,
    faTimesCircle,
    faTrash,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import CollapseField from "../../../components/sub/collapse/CollapseField";
import FullScreenModal, { FullScreenCloseButton, FullScreenModalBody, FullScreenModalFooter } from "../../../components/sub/modal/FullScreenModal";
import useAlert from "../../../hooks/AlertHook";
import useBrasilState from "../../../hooks/BrasilStatesHook";
import useWorldCountries from "../../../hooks/WorldCountriesHook";
import { useUser } from "../../../provider/UserProvider";
import { ClientCardStyles } from "./ClientsStyles";

const ClientCard = ({ client, refreshClients }) => {
    const [hasChangedInfo, setHasChangedInfo] = useState(false);
    const [alert, createAlert] = useAlert();
    const { authenticatedFetch } = useUser();

    const collapseRef = useRef();
    const formRef = useRef();

    const deleteButtonRef = useRef();
    const resetPasswordButtonRef = useRef();
    const discardChangesButtonRef = useRef();

    const [states] = useBrasilState();
    const [countries] = useWorldCountries();

    const [client_fullname, setClientFullName] = useState();

    const deleteClient = useCallback(async () => {
        console.log("deletando cliente");
        refreshClients();
    }, [refreshClients]);

    const resetClientPassword = useCallback(async () => {
        console.log("reseting client password");
    }, []);

    const resetFormInputsToClientDefault = useCallback(async () => {
        const form = formRef.current;
        form.cpf_cnpj.value = client.cpf_cnpj;
        form.first_name.value = client.first_name;
        form.last_name.value = client.last_name;
        form.email.value = client.email;
        form.phone.value = client.phone;
        form.address_zip.value = client.address_zip;
        form.address_street.value = client.address_street;
        form.address_neighborhood.value = client.address_neighborhood;
        form.address_number.value = client.address_number;
        form.address_country.value = client.address_country;
        form.address_city.value = client.address_city;
        form.address_state.value = client.address_state;
        form.birthday.value = client.birthday.split("T")[0];
    }, [client]);

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
            createAlert(`Ocorreu um erro ao criar o cliente, o campo ${field_name} é invalido`, "danger", false);
        },
        [createAlert]
    );

    const updateClientInfo = useCallback(async () => {
        if (!hasChangedInfo) {
            return;
        }
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

        const data = await authenticatedFetch("company/client/update", {
            body: {
                cpf_cnpj,
                first_name,
                last_name,
                email,
                phone,
                address_zip,
                address_street,
                address_neighborhood,
                address_number,
                address_country,
                address_city,
                address_state,
                birthday,
            },
        });

        if (!data.data && !data.success) {
            createAlert("Ocorreu um erro ao atualizar o cliente, por favor contate um administrador", "danger", false);
            return;
        }

        if (data.data && data.data.code && data.data.code === 3) {
            createAlert("Ocorreu um erro ao atualizar o cliente, não foi possivel achar um cliente com esse CPF", "danger", false);
            return;
        }
        if (data.data && data.data.code && data.data.code === 2) {
            createAlert("Ocorreu um erro ao atualizar o cliente, você já possui um funcionaro com esse CPF", "danger", false);
            return;
        }

        createAlert("Cliente atualizado com sucesso!", "success", false);
        setHasChangedInfo(false);
        refreshClients();
    }, [hasChangedInfo, createAlert, authenticatedFetch, alertMissingField, refreshClients]);

    useEffect(() => {
        if (!client) {
            return;
        }
        setClientFullName(capitalizeFirstLetter(client.first_name) + " " + capitalizeFirstLetter(client.last_name));
        resetFormInputsToClientDefault();
    }, [client, resetFormInputsToClientDefault]);

    return (
        <>
            {alert}
            <li className="list-group-item p-0">
                <FullScreenModal title={"Descartar alterações do Cliente"} toggleButtonRef={discardChangesButtonRef}>
                    <FullScreenModalBody>
                        <p>Você desejá mesmo descartar alterações feitas no cliente {client_fullname}?</p>
                    </FullScreenModalBody>
                    <FullScreenModalFooter>
                        <FullScreenCloseButton onClick={resetFormInputsToClientDefault} className="btn btn-danger">
                            Descartar
                        </FullScreenCloseButton>
                        <FullScreenCloseButton className="btn btn-primary text-white">Cancelar</FullScreenCloseButton>
                    </FullScreenModalFooter>
                </FullScreenModal>
                <FullScreenModal title={"Resetar Senha do Cliente"} toggleButtonRef={resetPasswordButtonRef}>
                    <FullScreenModalBody>
                        <p>Você desejá mesmo resetar a senha de {client_fullname}?</p>
                    </FullScreenModalBody>
                    <FullScreenModalFooter>
                        <FullScreenCloseButton onClick={resetClientPassword} className="btn btn-danger">
                            Resetar
                        </FullScreenCloseButton>
                        <FullScreenCloseButton className="btn btn-primary text-white">Cancelar</FullScreenCloseButton>
                    </FullScreenModalFooter>
                </FullScreenModal>
                <FullScreenModal title={"Deletar Cliente"} toggleButtonRef={deleteButtonRef}>
                    <FullScreenModalBody>
                        <p>Você desejá mesmo deletar o cliente {client_fullname}?</p>
                    </FullScreenModalBody>
                    <FullScreenModalFooter>
                        <FullScreenCloseButton onClick={deleteClient} className="btn btn-danger">
                            Deletar
                        </FullScreenCloseButton>
                        <FullScreenCloseButton className="btn btn-primary text-white">Cancelar</FullScreenCloseButton>
                    </FullScreenModalFooter>
                </FullScreenModal>
                <ClientCardStyles className="card card-body py-0">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center py-3 collapse-button" ref={collapseRef}>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="client-icon me-3">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <span className="m-0 fw-bold text-center">{client_fullname}</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <CollapseField buttonRef={collapseRef}>
                                <form ref={formRef} className="row" onChange={() => setHasChangedInfo(true)}>
                                    <hr />
                                    <h6 className="mb-3">Informações do cliente</h6>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="first_name" className="form-label">
                                            Nome
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faIdCard} />
                                            </span>
                                            <input id="first_name" type="text" className="form-control" placeholder="Nome" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="first_name" className="form-label">
                                            Sobrenome
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faIdCard} />
                                            </span>
                                            <input id="last_name" type="text" className="form-control" placeholder="Sobrenome" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="cpf_cnpj" className="form-label">
                                            CPF/CNPJ
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faIdBadge} />
                                            </span>
                                            <input id="cpf_cnpj" disabled type="number" className="form-control" placeholder="CPF" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="email" className="form-label">
                                            E-Mail
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faMailBulk} />
                                            </span>
                                            <input id="email" type="email" className="form-control" placeholder="E-mail" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="phone" className="form-label">
                                            Telefone
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faPhone} />
                                            </span>
                                            <input id="phone" type="number" className="form-control" placeholder="Telefone" />
                                        </div>
                                    </div>
                                    <hr />
                                    <h6 className="mb-3">Endereço do cliente</h6>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="address_zip" className="form-label">
                                            CEP
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faStreetView} />
                                            </span>
                                            <input id="address_zip" type="text" className="form-control" placeholder="CEP" onChange={handleCEPFill} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="address_street" className="form-label">
                                            Rua
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faRoad} />
                                            </span>
                                            <input id="address_street" type="text" className="form-control" placeholder="Rua" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="address_neighborhood" className="form-label">
                                            Bairro
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faHouseUser} />
                                            </span>
                                            <input id="address_neighborhood" type="text" className="form-control" placeholder="Bairro" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="address_number" className="form-label">
                                            Número
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faSortNumericUpAlt} />
                                            </span>
                                            <input id="address_number" type="number" className="form-control" placeholder="Numero" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="address_city" className="form-label">
                                            Cidade
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faCity} />
                                            </span>
                                            <input id="address_city" type="text" className="form-control" placeholder="Cidade" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="address_city" className="form-label">
                                            Estado
                                        </label>
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
                                        <label htmlFor="address_city" className="form-label">
                                            País
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faFlag} />
                                            </span>
                                            <select id="address_country" className="form-select" aria-label="Estado Selector" defaultValue={"BR"}>
                                                {countries.map((country, id) => (
                                                    <option key={id} value={country.code}>
                                                        {country.code + " - " + country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="birthday" className="form-label">
                                            Aniversário
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faBirthdayCake} />
                                            </span>
                                            <input id="birthday" type="date" className="form-control" placeholder="Aniversario" />
                                        </div>
                                    </div>
                                    <hr />
                                    <h6 className="mb-3">Opções administrativas</h6>
                                </form>
                                <div className="row mb-3">
                                    <div className="col-12 d-flex align-items-center justify-content-between border-bottom pb-2">
                                        <span>Salvar alterações</span>
                                        <button className="btn btn-success text-white me-2" disabled={!hasChangedInfo} onClick={updateClientInfo}>
                                            <FontAwesomeIcon icon={faSave} />
                                        </button>
                                    </div>
                                    <div className="col-12 d-flex align-items-center justify-content-between border-bottom py-2">
                                        <span>Descartar alterações</span>
                                        <button className="btn btn-warning text-white me-2" ref={discardChangesButtonRef}>
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                        </button>
                                    </div>
                                    <div className="col-12 d-flex align-items-center justify-content-between border-bottom py-2">
                                        <span>Resetar Senha</span>
                                        <button className="btn btn-danger text-white me-2" ref={resetPasswordButtonRef}>
                                            <FontAwesomeIcon icon={faKey} />
                                        </button>
                                    </div>
                                    <div className="col-12 d-flex align-items-center justify-content-between py-2">
                                        <span>Deletar Cliente</span>
                                        <button className="btn btn-danger text-white me-2" ref={deleteButtonRef}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </CollapseField>
                        </div>
                    </div>
                </ClientCardStyles>
            </li>
        </>
    );
};

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ClientCard;
