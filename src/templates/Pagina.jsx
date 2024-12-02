import Menu from "./Menu";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Menu />
                {
                    props.children
                }
            </Container>
            
        </>
    )
}

