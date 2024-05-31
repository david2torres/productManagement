import { Product } from '../interfaces/product.interface';

export const selectedProduct: Product = {
  id: 0,
  name: '',
  description: '',
  imageUrl: '',
  creationDate: new Date(),
};

export const initList: Product[] = [
  {
    id: 1,
    name: 'Plaza',
    description: 'Autor: Frazao Studio Latino   |   Crédito: Getty Images',
    imageUrl:  'https://museonacional.gov.co/exposiciones/Documents/IMG_9782.jpg',
    creationDate: new Date(),
  },
  {
    id: 2,
    name: 'Museo Nacional de Colombia on X',
    description:
      'Museo Nacional de Colombia on X: "¡Hoy celebramos #200añosDeHistorias! ',
    imageUrl: 'https://pbs.twimg.com/media/F2I2tUOXoAMGB9F.jpg:large',
    creationDate: new Date(),
  },
  {
    id: 3,
    name: 'El Museo Nacional de Colombia',
    description:
      'El Museo Nacional de Colombia cuenta la historia de la Guerra de los Mil Días',
    imageUrl:
      'https://cdnuploads.aa.com.tr/uploads/Contents/2018/12/04/thumbs_b_c_39526dd596d7ce583ad08e15e0059ffc.jpg?v=201737',
    creationDate: new Date(),
  },
];
