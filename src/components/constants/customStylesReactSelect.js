export const customStylesReactSelect = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#222128',
        margin: '8px',
        border: 'none',
        borderRadius: '4px',
        width: 200,
        '@media screen and (max-width: 767px)': {
            ...provided['@media screen and (max-width: 767px)'],
            width: 140,
            margin: '2px',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#59565D',
        border: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#19181F' : '',
        cursor: 'pointer',
        color: '#fff',
        border: 'none',
        ':active': {
            backgroundColor: '#0F1115',
        },
    }),
    menuList: (provided) => ({
        ...provided,
        borderRadius: '4px',
        backgroundColor: '#222128',
        color: '#fff',
        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(60, 60, 60, 0.5)',
            borderRadius: '4px',
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#59565D' : '#fff',
    }),
    indicatorSeparator: (provided) => ({
        display: 'none',
    }),
};
