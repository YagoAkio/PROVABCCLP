import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef, useEffect } from "react";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    


    async function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        
        try {
            const resposta = await fetch(`https://backend-bcc-2-b.vercel.app/usuario/verificarSenha`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nickname: nomeUsuario,
                    senha: senha
                })
            });
            
            // Verifica se a resposta foi bem-sucedida
            if (resposta.ok) { // resposta.ok é true para códigos de status 200-299
                
            } else {
                // Aqui você pode lidar com a resposta de erro, se necessário
                console.error('Erro ao validar:', resposta.status);
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
        }
    }
 
    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicEmail">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário" 
                        ref={nomeUsuario}
                        />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        ref={senha}
                         />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}