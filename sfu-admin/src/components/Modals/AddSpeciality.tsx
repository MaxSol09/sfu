import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'; // Replace with your actual modal import
import { UserData } from '../../types/types';

type Props = {
    modal: boolean, 
    setModal: any,
    user: UserData
}

export const AddSpeciality: React.FC<Props> = ({ modal, setModal, user }) => {
    const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);

    const specialities = [
        {value: 'Поступление', id: 1},
        {value: 'Общежитие', id: 2},
        {value: 'Стипендия', id: 3},
        {value: 'Хакатоны', id: 4},
        {value: 'Кафедры', id: 5},
        {value: 'Мероприятия', id: 6},
        {value: 'Университет', id: 7},
        {value: 'Факультет', id: 8},
        {value: 'Другое', id: 9},
    ]


    console.log(selectedSpecialities)

    const toggleSpeciality = (speciality: string) => {
        setSelectedSpecialities(prev => 
            prev.includes(speciality) ? prev.filter(s => s !== speciality) : [...prev, speciality]
        );
    };

    return (
        <Modal open={modal} cancelText={'Отмена'} okText={"Изменить"} onCancel={() => setModal(false)} onClose={() => setModal(false)}>
            <p className='text-[19px]'>Изменение специальности</p>
            <div className='flex flex-wrap w-full gap-[10px] gap-y-0 mt-[15px]'>
                {specialities.map((speciality) => (
                    <div 
                        key={speciality.id} 
                        onClick={() => toggleSpeciality(speciality.value)} 
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            margin: '5px 0',
                            backgroundColor: selectedSpecialities.includes(speciality.value) ? '#d3f9d8' : '#f0f0f0',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        {speciality.value}
                    </div>
                ))}
            </div>
        </Modal>
    );
};
