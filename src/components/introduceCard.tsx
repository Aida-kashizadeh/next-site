import Img from "../assets/images/header-min.png"
interface IntroduceCardProps{
    img1?:string,
    img2?:string,
    img3?:string,
    text1?:string,
    text2?:string,
    text3?:string
}

export default function IntroduceCard({img1,img2,img3,text1,text2,text3}:IntroduceCardProps) {
    const text="متن تستی"
    
  return (
    <>
      <div
        style={{ margin: "0 auto", minHeight: "300px" ,textAlign:'center',alignItems:'center'}}
        className="w-4/5 flex flex-col sm:flex-row justify-evenly border  rounded-lg shadow-slate-600"
      >
        <div className="h1 m-10">
            <div style={{borderRadius:50}}>
                <img style={{border:"1px solid black",borderRadius:100,width:"150px",height:"150px"}} src={img1 ||Img.src}  alt={img1}/>
            </div>
            <div>{text1 ||text}</div>
        </div>
        <div className="h1 m-10">
            <div style={{borderRadius:50}}>
                <img style={{border:"1px solid black",borderRadius:100,width:"150px",height:"150px"}} src={img2 ||Img.src} alt={img2}/>
            </div>
            <div>{text2 || text}</div>
        </div>
        <div className="h1 m-10">
            <div style={{borderRadius:50}}>
                <img style={{border:"1px solid black",borderRadius:100,width:"150px",height:"150px"}} src={img3 ||Img.src}  alt={img3}/>
            </div>
            <div>{text3 ||text}</div>
        </div>
      </div>
    </>
  );
}
