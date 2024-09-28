import cl from './BlendBlock.module.scss'
import baseImg from './../../assets/bridj.jpg'

type PropsType={
  imgUrl?:string|any
  title?:string
}
const BlendBlock = ({imgUrl, title}:PropsType) => {
  return (<div className={cl.blend}>
    {imgUrl? <img src={imgUrl} alt="users img"/> : <img src={baseImg} alt="baseImg"/>}
    <h2>{title? title:'base h2 title'}</h2>
    </div>);
};

export default BlendBlock;
