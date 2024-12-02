import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagina from "../../templates/Pagina";
import { useSelector, useDispatch } from 'react-redux';
import { alterarUsuario, cadastrarUsuario } from "../../redux/usuarioReducer";
import ESTADO from "../../Estados/estado";

export default function FormularioUsuario(props) {
    const usuarioVazio = {
        nickname: "",
        urlAvatar: "",
        senha: "",
    };
    
    const estadoInicialUsuario = props.usuarioParaEdicao || usuarioVazio;
    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [formValidado, setFormValidado] = useState(false);

    const { estado, mensagem } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(cadastrarUsuario(usuario));
            } else {
                dispatch(alterarUsuario(usuario));
                props.setModoEdicao(false);
                props.setUsuarioParaEdicao(usuarioVazio);
            }
            setUsuario(usuarioVazio);
            setFormValidado(false);
        } else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Row>
                {/* Formulário de cadastro */}
                <Col md={6}>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <FloatingLabel label="Nickname:" className="mb-3">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Informe o seu nickname" 
                                            id="nickname" 
                                            name="nickname" 
                                            value={usuario.nickname}
                                            onChange={manipularMudancas}
                                            required 
                                        />
                                        <Form.Control.Feedback type="invalid">Informe o nickname!</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group>
                                    <FloatingLabel label="Foto de Perfil:" className="mb-3">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="URL da foto de perfil" 
                                            id="urlAvatar" 
                                            name="urlAvatar" 
                                            onChange={manipularMudancas}
                                            value={usuario.urlAvatar}
                                            required 
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid">Informe a URL da foto de perfil!</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            {/* Adicionando o campo de senha */}
                            <Col md={12}>
                                <Form.Group>
                                    <FloatingLabel label="Senha:" className="mb-3">
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Informe a sua senha" 
                                            id="senha" 
                                            name="senha" 
                                            value={usuario.senha}
                                            onChange={manipularMudancas}
                                            required 
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid">Informe a senha!</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                            <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                        >
                            {props.modoEdicao ? "Alterar" : "Cadastrar"}
                        </Button>
                            </Col>
                            <Col md={6} className="d-flex justify-content-end">
                            <Button
                            type="button"
                            variant="secondary"
                            className="w-100"
                            onClick={() => props.exibirFormulario(false)}
                        >
                            Voltar
                        </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                
            </Row>
        </Container>
    );
}
