import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { isFloat } from '../common'

export default function Rating( {value, text} ) {

  const totalStarNum = 5

  return (
    <div className="rating">
      {
        Array(Math.floor(value)).fill().map((_) => <span><FaStar/></span>  )
      }
      {
        isFloat(value) && <span><FaStarHalfAlt/></span>
      }
      {
        Array(Math.floor(totalStarNum - value)).fill().map((_) => <span><FaRegStar/></span> )
      }

      <span className='rating-text'>
        {text && text}
      </span>
    </div>
  )
}