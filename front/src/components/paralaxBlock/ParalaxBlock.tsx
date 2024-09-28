import cl from './ParalaxBlock.module.scss'

const ParalaxBlock = () => {
  return (<>
    <div className={cl.content}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi consectetur cum fuga id molestias saepe vero voluptas, voluptate voluptatum!</p>
    </div>
    <div className={cl.root}></div>
    <div className={cl.content}>
      <h3>Lorem ipsum dolor sit amet, consectetur.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, modi!</p>
    </div>
    </>);
};

export default ParalaxBlock;
