import '../../components/css/Main.css';

function Test() {
  setTimeout("location.href='http://localhost:3000/main'", 4900);
  return (
    <div className="div">
      <div className='overlay'></div>
      <img className='main_image' src='/main.jpg' id="scrollDiv" />
      <div className='text-box'>
        <h2 className='text'>밥풀의</h2>
        <h2 className='text'>새로운</h2>
        <h2 className='text'>경험</h2>
      </div>
    </div>
  );

}
export default Test;
