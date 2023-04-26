import Matrix from './matrix.jpg';
import './matrix-image.scss';

class MatrixImage{
    render(){
        const img =document.createElement('img');
        img.src = Matrix;
        img.alt = "Matrix";
        img.classList.add("matrix-image");

        const body = document.querySelector('body');
        body.appendChild(img);
    }
}

export default MatrixImage;