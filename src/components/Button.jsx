import PropTypes from 'prop-types';

const Button = ({ operator, fn }) => {
    return (
        <button
            className='h-10 w-10 flex items-center justify-center font-bold text-white text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-lime-500'
            type='button'
            onClick={fn}
        >
            {operator}
        </button>
    );
};

Button.propTypes = {
    operator: PropTypes.string.isRequired,
    fn: PropTypes.func.isRequired,
};

export default Button;