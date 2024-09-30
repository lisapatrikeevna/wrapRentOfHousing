import { Box, CircularProgress, Typography } from "@mui/material";
import RealEstateList from "../../components/realty/RealEstateList";
import cl from './Home.module.scss'
import SearchSettings, { SearchParamsType } from "../../components/searchSettings/SearchSettings";
import BlendBlock from "../../components/blendBlock/BlendBlock";
import ParalaxBlock from "../../components/paralaxBlock/ParalaxBlock";
import ServicesBlock from "../../components/servisesBlock/ServicesBlock";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";
import { useGetCategoryQuery } from "../../bll/category/category.service";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [newParams, setParams] = useState('?page=1');
  const { data: realty, isLoading: isRealtyLoading, isError: isRealtyError } = useGetRealtyQuery({ params: newParams });
  const { data: categories, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryQuery();

  console.log('realty.current_page', realty?.current_page);

  const searchHandler = (searchParams: SearchParamsType) => {
    let params = newParams;
    console.log("searchHandler-params : ", params);

    if (searchParams.category) {
      params = params.replace(/category=\d+/, `category=${searchParams.category}`) || `${params}&category=${searchParams.category}`;
    }
    if (searchParams.city) {
      params = params.replace(/city=\w+/, `city=${searchParams.city}`) || `${params}&city=${searchParams.city}`;
    }

    setParams(params);  // Обновляем параметры и запускаем запрос с обновлённым состоянием
    console.log('Params end : ', params);
  }

  const pageHandler = (current_page: number) => {
    let params = newParams;

    if (params.includes('page')) {
      params = params.replace(/page=\d+/, `page=${current_page}`);
    } else {
      console.log('!!!!!! newer');
      params = `${params}&page=${current_page}`;
    }

    console.log('pageHandler-params : ', params);
    setParams(params);  // Обновляем параметры для пагинации
  }

  return (
    <>
      <Box className={cl.homeBg}>
        <h3 className={cl.title}>HomePage title</h3>
        {isErrorCategory && <Typography color="error"> {isErrorCategory}</Typography>}
        {isLoadingCategory && <CircularProgress />}
        {(!isLoadingCategory && !isErrorCategory && categories) &&
          <SearchSettings searchHandler={searchHandler} categories={categories} />}
      </Box>

      {isRealtyError && <Typography color="error">Error loading realty data</Typography>}
      {isRealtyLoading && <CircularProgress />}
      {(!isRealtyLoading && !isRealtyError && realty) &&
        <RealEstateList realty={realty} pageHandler={pageHandler} />}

      <ParalaxBlock />
      <ServicesBlock />
      <BlendBlock />
    </>
  );
};

export default HomePage;
