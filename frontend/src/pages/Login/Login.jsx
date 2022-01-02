import { faBusinessTime, faKey, faUser, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Glass from "../../components/sub/glass/Glass";
import { LoginStyles } from "./LoginStyles";

const Login = () => {
    const cpfRef = useRef();
    const companyCPFRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = useCallback(async () => {
        const cpf_cnpj = cpfRef.current.value;
        const company_cpf_cnpj = companyCPFRef.current.value;
        const password = passwordRef.current.value;
        if (!cpf_cnpj) {
            setErrorMessage("Por favor preencha o campo de cpf ou cnpj.");
            return;
        }
        if (!password) {
            setErrorMessage("Por favor preencha o campo de senha.");
            return;
        }
        if (!company_cpf_cnpj) {
            setErrorMessage("Por favor preencha o campo de cpf ou cnpj da companhia.");
            return;
        }

        try {
            console.log(cpf_cnpj, password, company_cpf_cnpj);
            const data = await fetch(process.env.REACT_APP_SERVER_IP + "/auth/company/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cpf_cnpj,
                    password,
                    company_cpf_cnpj,
                }),
            });
            if (data.status === 401) {
                setErrorMessage("Credenciais invalidas, tente novamente.");
                return;
            }
            const jwt = data.headers.get("Authorization");
            console.log("login jwt: " + jwt);
            localStorage.setItem("jwt", jwt);
            history.push("/dashboard");
        } catch (err) {
            setErrorMessage("Ocorreu um erro inesperado, por favor tente mais tarde.");
        }
    }, [history]);

    const validateJWT = useCallback(
        async (jwt) => {
            try {
                const data = await fetch(process.env.REACT_APP_SERVER_IP + "/validator", {
                    method: "post",
                    headers: {
                        Authorization: jwt,
                    },
                });
                const status = data.status;
                if (status === 200) {
                    history.push("/dashboard");
                    return;
                }
            } catch (err) {
                console.log("JWT invalid needs to login!");
            }
        },
        [history]
    );

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            validateJWT(localStorage.getItem("jwt"));
        }
    }, [validateJWT]);

    return (
        <LoginStyles>
            <div className="container">
                <div className="row w-100 h-100 align-items-center justify-content-center m-0">
                    <div className="col col-10 col-sm-8 col-md-6 p-auto">
                        <Glass className="d-flex flex-column py-4 px-3">
                            <div className="row">
                                <div className="col col-12 d-flex align-items-center justify-content-center">
                                    <h4 className="text-dark">Painel do Administrador</h4>
                                </div>
                                {errorMessage && (
                                    <div className="col-12 d-flex align-items-center justify-content-center">
                                        <span className="text-danger">{errorMessage}</span>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="col col-12 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="cpf-input" className="mb-1">
                                            CPF ou CNPJ da companhia
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text bg-primary h-100">
                                                    <FontAwesomeIcon icon={faBusinessTime} color="white" size="1x" />
                                                </div>
                                            </div>
                                            <input type="number" className="form-control" id="cpf-input" ref={companyCPFRef} placeholder="Digite o CPF ou CNPJ da companhia" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-12 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="cpf-input" className="mb-1">
                                            CPF ou CNPJ
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text bg-primary h-100">
                                                    <FontAwesomeIcon icon={faUser} color="white" size="1x" />
                                                </div>
                                            </div>
                                            <input type="number" className="form-control" id="cpf-input" ref={cpfRef} placeholder="Digite seu CPF ou CNPJ" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-12 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="senha-input" className="mb-1">
                                            Senha
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text bg-primary h-100">
                                                    <FontAwesomeIcon icon={faKey} color="white" size="1x" />
                                                </div>
                                            </div>
                                            <input type="password" className="form-control" id="senha-input" ref={passwordRef} placeholder="Digite sua senha" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-12 mt-4 d-flex">
                                    <button className="btn btn-md btn-primary text-white ms-auto" onClick={handleLogin}>
                                        <FontAwesomeIcon icon={faUserCheck} className="me-2" />
                                        Realizar Login
                                    </button>
                                </div>
                                <div className="col col-12 mt-1 d-flex">
                                    <p className="text-primary text-decoration-none mt-1 ms-auto mb-0" style={{ fontSize: "0.9rem", cursor: "pointer" }}>
                                        Esqueceu sua senha?
                                    </p>
                                </div>
                            </div>
                        </Glass>
                    </div>
                </div>
            </div>
        </LoginStyles>
    );
};

export default Login;
