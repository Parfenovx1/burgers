import React from 'react';
import PropTypes from 'prop-types';

class Shipment extends React.Component{

    static propTypes = {
        total: PropTypes.number
    }

    render(){
        const {total} = this.props;
        const shipping = total > 0 && total < 500 ? 200 : 50 ;
        const shippingNeon = shipping === 50 ? (
            <span className="font-effect-neon total_wrap-cheap">
                {shipping} ₴
            </span>
        ) : (
            <span>{shipping} ₴</span>
        );
        return(
            <div className="total">
                <div className="total_wrap">
                    <div>
                        <div>Доставка: {total > 0 ? shippingNeon : null}</div>
                        <div className="total_wrap-free">
                            {total < 500 ? `Закажите еще на ${500- total} ₴ для доставки за 50 ₴` : null}
                        </div>
                    </div>
                    <div className="total_wrap-final">
                        Итого с доставкой: {total + shipping} ₴
                    </div>
                </div>
            </div>
        )
    }
}

export default Shipment;