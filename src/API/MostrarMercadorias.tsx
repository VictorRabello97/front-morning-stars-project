export default async function mostrarMercadorias() {

    const mercadoria = await fetch("https://localhost:7060/api/Mercadoria")
  
    const data = await mercadoria.json()
  
    return data   
  
  }