import { useParams, useNavigate } from "react-router-dom"
import NavBar from '../components/navbar'
import Footer from "../components/footer"

function Checkout() {
    const { placa } = useParams()
    const navigate = useNavigate()

    return(
        <>
        <NavBar/>
        <main>
            <h2>Relatorio veicular da {placa}</h2>
            <p>R$ 12,50</p>

            <div> Escaneie o Qr code</div>
            <button type="button">Copiar código PIX</button>
            <button type="button" onClick={() => navigate(`/veiculo/${placa}`)}>
                Já está pago</button>
        </main>
        <Footer />
        </>
    )

}  

export default Checkout