import { Box, CircularProgress, Typography } from "@mui/material";
import RealEstateList from "../../components/realty/RealEstateList";
// import homeBg from './../../assets/homeBg.jpg'
import cl from './Home.module.scss'
import SearchSettings from "../../components/searchSettings/SearchSettings";
import BlendBlock from "../../components/blendBlock/BlendBlock";
import ParalaxBlock from "../../components/paralaxBlock/ParalaxBlock";
import ServicesBlock from "../../components/servisesBlock/ServicesBlock";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";





const HomePage = () => {
  const {data: realty, isLoading:isRealtyLoading, isError:isRealtyError} = useGetRealtyQuery({params:'?page=2'})
  console.log('realty', realty);

  return<>
    <Box className={cl.homeBg}>
      <h3 className={cl.title}>HomePage title</h3>
      {/*<img src={homeBg} alt="home bg" />*/}
      <SearchSettings/>
    </Box>

    {isRealtyError && <Typography color="error">Error loading realty data</Typography>}
    {isRealtyLoading &&  <CircularProgress/>}
    {(!isRealtyLoading && !isRealtyError && realty)&&<RealEstateList realty={realty}/>}

    <ParalaxBlock/>
    <ServicesBlock/>
    <BlendBlock/>

  </>
};

export default HomePage;
