import ImageWithText from "../components/ImageWithText";
import Carroussel from "./Carroussel/Carroussel";
import img1 from "../assets/images/crema natural.jpg";

function Home() {
    return (
        <>
        <Carroussel />
        <ImageWithText
            imageSrc={img1}
            altText="calendula"
            description="En Aritz, nos dedicamos al cuidado de tu piel y cuerpo de forma natural, con la mejor seleccion de elementos para que te sientas unico/a."
            textAlign="center"
            />
        </>
  );
}

export default Home;