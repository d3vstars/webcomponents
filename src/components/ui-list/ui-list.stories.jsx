import { h } from '@stencil/core';
import { storiesOf } from '@storybook/html';
import notes from './readme.md';

const data = [
  {
    name: 'Nico',
    image: 'https://ih1.redbubble.net/image.1446145132.9260/flat,128x128,075,t.jpg',
    location: { address: 'Pajaritos #12333', city: 'Santiago' },
    colors: ['red', 'green', 'yellow']
  },
  {
    name: 'Luis',
    image: 'https://pm1.narvii.com/6431/82db7fa9ab4002a3c3931e2f6f69dc4888eaf3f1_128.jpg',
    location: { address: 'Maracaibo #38499', city: 'Maracaibo' },
    colors: ['purple', 'blue', 'black']
  }
];

const headersData = [
  {
    key: 'name',
    label: 'Name',
    searchable: false,
    render: nameAttribute => {
      return `<h1>${nameAttribute}</h1>`;
    }
  },
  {
    key: 'image',
    label: 'Image',
    searchable: false,
    render: image => {
      return `<img src=${image} />`;
    }
  },
  {
    key: 'location',
    label: 'Location',
    searchable: false,
    render: location => {
      const { address, city } = location;
      return `Address: ${address} from ${city}`;
    }
  },
  {
    key: 'colors',
    label: 'Colors',
    searchable: false,
    render: colors => {
      return `<ul>${colors.map(value => `<li>${value}</li>`).join('')}</ul>`;
    }
  },
  {
    key: 'actionsButton',
    label: 'Actions',
    searchable: false,
    type: 'button',
    actionsButton: [
      {
        text: 'Delete',
        eventName: 'delete-action',
        style: {
          textDecoration: 'none',
          color: '#fff',
          backgroundColor: '#0092dd',
          textAlign: 'center',
          letterSpacing: '.5px',
          fontSize: '14px',
          cursor: 'pointer',
          outline: '0',
          border: 'none',
          borderRadius: '2px',
          display: 'inline-block',
          height: '36px',
          lineHeight: '36px',
          padding: '0 16px',
          textTransform: 'uppercase',
          margin: '0px 5px 0px 5px'
        }
      }
    ]
  },
  {
    key: 'actionsButtons',
    label: 'Actions',
    searchable: false,
    type: 'button',
    actionsButton: [
      {
        text: 'Delete',
        eventName: 'delete-action',
        style: {
          textDecoration: 'none',
          color: '#fff',
          backgroundColor: '#26a69a',
          textAlign: 'center',
          letterSpacing: '.5px',
          fontSize: '14px',
          cursor: 'pointer',
          outline: '0',
          border: 'none',
          borderRadius: '2px',
          display: 'inline-block',
          height: '36px',
          lineHeight: '36px',
          padding: '0 16px',
          textTransform: 'uppercase',
          margin: '0px 5px 0px 5px'
        }
      },
      {
        text: 'Update',
        eventName: 'update-action',
        style: {
          textDecoration: 'none',
          color: '#fff',
          backgroundColor: '#0092dd',
          textAlign: 'center',
          letterSpacing: '.5px',
          fontSize: '14px',
          cursor: 'pointer',
          outline: '0',
          border: 'none',
          borderRadius: '2px',
          display: 'inline-block',
          height: '36px',
          lineHeight: '36px',
          padding: '0 16px',
          textTransform: 'uppercase',
          margin: '0px 5px 0px 5px'
        }
      }
    ]
  }
];

storiesOf('UI List', module)
  .add(
    'With image',
    () => {
      setTimeout(() => {
        const component = document.querySelector('ui-list');
        component.dataTable = data.map(values => ({ name: values.name, image: values.image }));
        const [name, image] = headersData;
        component.headers = [name, image];
      });
      return `<ui-list />`;
    },
    { notes }
  )
  .add(
    'With object data',
    () => {
      setTimeout(() => {
        const component = document.querySelector('ui-list');
        component.dataTable = data.map(values => ({ name: values.name, location: values.location }));
        const [name, , location] = headersData;
        component.headers = [name, location];
      });
      return `<ui-list>`;
    },
    { notes }
  )
  .add(
    'With array data',
    () => {
      setTimeout(() => {
        const component = document.querySelector('ui-list');
        component.dataTable = data.map(values => ({ name: values.name, colors: values.colors }));
        const [name, , , colors] = headersData;
        component.headers = [name, colors];
      });
      return `<ui-list>`;
    },
    { notes }
  )
  .add(
    'With loading',
    () => {
      setTimeout(() => {
        const component = document.querySelector('ui-list');
        component.dataTable = [];
        component.headers = [];
      });
      return `<ui-list>`;
    },
    { notes }
  )
  .add(
    'With one button',
    () => {
      setTimeout(() => {
        const component = document.querySelector('ui-list');
        component.dataTable = data.map(values => ({ name: values.name }));
        const [name, , , , actionButton] = headersData;
        component.headers = [name, actionButton];
      });
      return `<ui-list>`;
    },
    { notes }
  )
  .add(
    'With more than one buttons',
    () => {
      setTimeout(() => {
        const component = document.querySelector('ui-list');
        component.dataTable = data.map(values => ({ name: values.name }));
        const [name, , , , , actionButtons] = headersData;
        component.headers = [name, actionButtons];
      });
      return `<ui-list>`;
    },
    { notes }
  );
