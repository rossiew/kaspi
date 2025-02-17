import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css'
import { carts } from './ProductsData';



// отображает информацию о продукте, такую как изображение, название, заголовок и кнопку для каждой страницы продукта.
const ProductCategory = () => {
    const { id } = useParams();

    //чтобы выполнят поиск элемента в массиве carts, 
    // который имеет свойство id, равное целому числу, переданному в переменной id.
    const product = carts && carts.find(product => product.id === parseInt(id));


    // егер продукты шықпай қалса
    if (!product || !product.pages) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div>
            {product.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                    <div className='first text-center m-14'>
                        <img src={page.img} alt={page.name} />
                        <h1 className=' text-5xl font-semibold p-9'>{page.name}</h1>

                        <h3 className=' text-2xl p-6'>{page.title}</h3>
                        <button>{page.button}</button>
                    </div>

                    {page.accordion && <Accordion accordionData={page.accordion} />}
                </div>
            ))}
        </div>
    );
};


//  Этот компонент отображает аккордеон, который содержит ответы на часто задаваемые вопросы о продукте.
const Accordion = ({ accordionData }) => {
    const [visibleItems, setVisibleItems] = useState({});



    //  toggleVisibility -- отвечает за изменение видимости элементов аккордеона в зависимости от их id
    const toggleVisibility = (id) => {
        setVisibleItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className="accordion-container">
            {accordionData.map((item, index) => (
                <div key={index} className="accordion">
                    {/* key-уникальный значение болу керек */}


                    <div className="accordion-question" onClick={() => toggleVisibility(item.id)}>
                        <b>{item.id}.</b> {item.question}
                    </div>
                    {visibleItems[item.id] && <div className="accordion-answer">{item.answer}</div>}
                </div>

            ))}
            <br />
            <br />

        </div>
    );
};

export default ProductCategory;
