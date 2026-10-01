import 'react'
import './App.css'

function App() {
  

  return (
    <>
      <section id="inicialHome">
        <div className="inicilVideo">
            <iframe src="https://www.canva.com/design/DAHWn073swo/DUtN6_ychB6pveyY4gPpFw/view" title="Canva Design" width="100%" height="100%" allowFullScreen allow="fullscreen"></iframe>
        </div>
       <div className="inicialText">
          <h1>Consulte e monitore placas de <br/><br/> veiculos em segundos ...</h1>
       </div>
        <div className="input-container">
         <input type="text" placeholder="Digite a placa do veiculo" />
         <button type="button" className="search-button">
          <a href="/login">Buscar</a>
          </button>
        </div>
     
      </section>

    

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
