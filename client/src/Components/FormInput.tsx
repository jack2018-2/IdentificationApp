import React, { useEffect, useState } from 'react';
import Position from '../Models/Position';
import PhoneInput from './MaskedInput';

const FormInput = (props: any) => {
    const [name, setname] = useState('');
    const [{inn, isInnValid}, setinn] = useState<{inn: number|null, isInnValid:boolean}>({inn:null, isInnValid:true});
    const [city, setcity] = useState('');
    const [street, setstreet] = useState('');
    const [house, sethouse] = useState<number|null>(null);
    const [fullAddress, setfulladdress] = useState('');
    const [passport, setpassport] = useState('');
    const [phone, setphone] = useState('');
    const [position, setposition] = useState(1);

    // useEffect(() => {
    //     const v = window.localStorage.getItem('name');
    //     setname(v ? v : '');
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem('name', name);
    // }, [name]);

    const onSubmit = (e: any) => {
        e.preventDefault();

        const user = makeUser();

        const isUserProvided = user && user !== null;

        if (isUserProvided) {
            props.sendMessage(user);
        }
        else {
            alert('Please insert an user');
        }
    }

    const onNameUpdate = (e: any) => {
        setname(e.target.value);
    }
    const onInnUpdate = (e: any) => {
        const v = e.target.value;
        if (!(v.length === 10 || v.length === 12)){
            setinn({inn: e.target.value, isInnValid: false});
        }
        else{
            setinn({inn: e.target.value, isInnValid: true});
        }
    }
    const onCityUpdate = (e: any) => {
        setcity(e.target.value);
        setfulladdress(v => updateFullAddress(v, e.target.value, 0))
    }
    const onStreetUpdate = (e: any) => {
        setstreet(e.target.value);
        setfulladdress(v => updateFullAddress(v, e.target.value, 1))
    }
    const onHouseUpdate = (e: any) => {
        sethouse(e.target.value);
        setfulladdress(v => updateFullAddress(v, e.target.value, 2))
    }
    const onPassportUpdate = (e: any) => {
        setpassport(e.target.value);
    }
    const onPhoneUpdate = (e: any) => {
            setphone(e.target.value);
    }
    const onPositionUpdate = (e: any) => {
        setposition(e.target.value);
    }

    const makeUser = (): any => {
        return {
            Id: props.userId,
            Name: name,
            Inn: inn,
            Address: fullAddress,
            Passport: passport,
            Phone: phone,
            Position: position,
        }
    }

    const updateFullAddress = (v: string, newV: string, idx: number): string => {
        const old = v.split(', ');
        if (old.length > idx) {
            
            old[idx] = newV;
            return old.join(', ');
        }
        else if (old.length === 0) return newV
        else return v + ', ' + newV;
    }

    return (
        <form
            onSubmit={onSubmit}>
            <label htmlFor="name">ФИО:</label>
            <br />
            <input
                id="name"
                name="name"
                value={name}
                onChange={onNameUpdate} />
            <br /> 
            <label htmlFor="inn">ИНН:</label>
            <br />
            <input
                id="inn"
                name="inn"
                value={inn as any}
                onChange={onInnUpdate} />
            <br />
            <label htmlFor="city">Город:</label>
            <br />
            <input
                id="city"
                name="city"
                value={city}
                onChange={onCityUpdate} />
            <br />
            <label htmlFor="street">Улица:</label>
            <br />
            <input
                id="street"
                name="street"
                value={street}
                onChange={onStreetUpdate} />
            <br />
            <label htmlFor="house">Дом:</label>
            <br />
            <input
                type='number'
                id="house"
                name="house"
                value={house as any}
                onChange={onHouseUpdate} />
            <br />
            <label htmlFor="passport">Паспортные данные:</label>
            <br />
            <input
                id="passport"
                name="passport"
                value={passport}
                onChange={onPassportUpdate} />
            <br />
            <label htmlFor="phone">Телефон:</label>
            <br />
            <PhoneInput
                id="phone"
                name="phone" 
                // : '+7(000)000-00-00'
                type='tel'
                value={phone}
                onChange={onPhoneUpdate} />
            <br />
            <label htmlFor="fullAddress">Адрес:</label>
            <br />
            <input
                id="fullAddress"
                name="fullAddress"
                value={fullAddress}
                disabled={true} />
            <br />
            <label htmlFor="position">Должность:</label>
            <br />
            <select
                id="position"
                name="position"
                value={position}
                onChange={onPositionUpdate}>
                    <option value={Position.Director}>Директор</option>
                    <option value={Position.Accountant}>Бухгалтер</option>
                    <option value={Position.Trusted}>Доверенное лицо</option>
                </select>
            <br />
            <button disabled={!isInnValid}>Идентифицировать</button>
        </form>
    )
};

export default FormInput;
