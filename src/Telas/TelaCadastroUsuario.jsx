import { Container,Alert } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormularioUsuario from "./Fomulario/FormularioUsuario";
import TabelaUsuarios from "./Tabela/TabelaUsuario";
import { useState } from "react";

export default function TelaCadastroUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [usuarioParaEdicao, setUsuarioParaEdicao] = useState({
        nickname: "",
        urlAvatar: "",
        senha: "",
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Usuário
                    </h2>
                </Alert>
                {
                    exibirFormulario ? 
                    <FormularioUsuario exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    usuarioParaEdicao={usuarioParaEdicao}
                                    setUsuarioParaEdicao={setUsuarioParaEdicao}/> 
                    : 
                    <TabelaUsuarios exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    setUsuarioParaEdicao={setUsuarioParaEdicao}/>
                }
            </Pagina>
        </Container>
    )
}