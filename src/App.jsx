import { useState, useEffect } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import { formatMoney, calculateTotalPay } from './helpers';

function App() {
	const [quantity, setQuantity] = useState(10000);
	const [months, setMonths] = useState(6);
	const [total, setTotal] = useState(0);
	const [pay, setPay] = useState(0);

	useEffect(() => {
		setTotal(calculateTotalPay(quantity, months));
	}, [quantity, months]);

	useEffect(() => {
		setPay(total / months);
	}, [total, months]);

	const MIN = 0;
	const MAX = 20000;
	const STEP = 100;

	function handleChange(evt) {
		setQuantity(+evt.target.value);
	}

	function handleDecrement() {
		const value = quantity - STEP;

		if (value < MIN) {
			alert('Cantidad mínima alcanzada');
			return;
		}

		setQuantity(value);
	}

	function handleIncrement() {
		const value = quantity + STEP;

		if (value > MAX) {
			alert('Cantidad máxima alcanzada');
			return;
		}

		setQuantity(value);
	}

	return (
		<div className='my-5 max-w-lg mx-auto bg-white shadow p-10'>
			<Header />

			<div className='flex justify-between my-6'>
				<Button
					operator='-'
					fn={handleDecrement}
				/>
				<Button
					operator='+'
					fn={handleIncrement}
				/>
			</div>

			<input
				className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
				type='range'
				onChange={handleChange}
				min={MIN}
				max={MAX}
				step={STEP}
				value={quantity}
			/>

			<p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
				{formatMoney(quantity)}
			</p>

			<h2 className='text-2xl font-extrabold text-gray-500 text-center'>
				Elige un <span className='text-indigo-600'>Plazo</span> a pagar
			</h2>

			<select
				className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
				value={months}
				onChange={evt => setMonths(evt.target.value)}
			>
				<option value='6'>6 Meses</option>
				<option value='12'>12 Meses</option>
				<option value='24'>24 Meses</option>
			</select>

			<div className='my-5 space-y-3 bg-gray-50 p-5'>
				<h2 className='text-2xl font-extrabold text-gray-500 text-center'>
					Resumen <span className='text-indigo-600'>de pagos</span>
				</h2>

				<p className='text-xl text-gray-500 text-center font-bold'>
					{months} Meses
				</p>
				<p className='text-xl text-gray-500 text-center font-bold'>{ formatMoney(total) } Total a pagar</p>
				<p className='text-xl text-gray-500 text-center font-bold'>{ formatMoney(pay) } Mensuales</p>
			</div>
		</div>
	);
}

export default App;
