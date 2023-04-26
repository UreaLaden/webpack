import Heading from "./components/heading/heading";
import MatrixImage from "./components/matrix-image/matrix-image";
import * as React from 'react';

const heading = new Heading();
heading.render('matrix');

const matrixImage = new MatrixImage();
matrixImage.render();
