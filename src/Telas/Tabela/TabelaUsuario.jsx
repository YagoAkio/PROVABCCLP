import { Button, Container, Table, Col, ListGroup, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../Estados/estado";
import { getUsuarios, excluirUsuario } from "../../redux/usuarioReducer";

export default function TabelaUsuarios(props) {
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();
    const [password, setPassword] = useState(""); 
    const [senhaErro, setSenhaErro] = useState(""); // Adiciona estado para mensagem de erro de senha
    const [usuarioExcluir, setUsuarioExcluir] = useState(null);
    const [showExcluir, setShowExcluir] = useState(false); 

    useEffect(() => {
        dispatch(getUsuarios(""));
    }, [dispatch]);

    useEffect(() => {
        if (estado === ESTADO.PENDENTE) {
            toast.info("Buscando usuários...", { toastId: "pendente" });
        } else if (estado === ESTADO.ERRO) {
            toast.error(mensagem, { toastId: "erro" });
        } else if (estado === ESTADO.OCIOSO) {
            toast.dismiss();
        }
    }, [estado, mensagem]);

    function deletarUsuario(usuario) {
        setUsuarioExcluir(usuario);
        setShowExcluir(true);
    }

    function confirmarExclusao() {
        if (!password) {
            setSenhaErro("A senha é obrigatória para confirmar a exclusão!");
            return;
        }
        console.log(usuarioExcluir);
        console.log(password);
        if (password && usuarioExcluir) {
            dispatch(excluirUsuario(usuarioExcluir.id,password))
                .then(() => {
                    setShowExcluir(false);
                    setPassword("");
                    setSenhaErro("");
                })
                .catch((err) => {
                    setSenhaErro("Senha incorreta!");
                });
        }
    }

    function editarUsuario(usuario) {
        props.setUsuarioParaEdicao(usuario);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }


    return (
        <Container>
            <Button
                type="button"
                onClick={() => {
                    props.exibirFormulario(true);
                }}
            >
                Novo Usuário
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>NickName</th>
                        <th>Data de Ingresso</th>
                        <th>URL</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nickname}</td>
                            <td>{usuario.dataIngresso}</td>
                            <td>{usuario.urlAvatar}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deletarUsuario(usuario)}
                                >
                                    Excluir
                                </Button>{" "}
                                <Button
                                    variant="warning"
                                    onClick={() => editarUsuario(usuario)}
                                >
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showExcluir} onHide={() => setShowExcluir(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua senha para confirmar"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {senhaErro && <p style={{ color: "red" }}>{senhaErro}</p>} {/* Exibe mensagem de erro */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowExcluir(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarExclusao}>
                        Confirmar Exclusão
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}