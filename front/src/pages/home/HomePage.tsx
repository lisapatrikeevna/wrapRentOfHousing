import { Box, CircularProgress, Typography } from "@mui/material";
import RealEstateList from "../../components/realty/RealEstateList";
import cl from './Home.module.scss'
import SearchSettings, { SearchParamsType } from "../../components/searchSettings/SearchSettings";
import BlendBlock from "../../components/blendBlock/BlendBlock";
import ParalaxBlock from "../../components/paralaxBlock/ParalaxBlock";
import ServicesBlock from "../../components/servisesBlock/ServicesBlock";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";
// import { useGetCategoryQuery } from "../../bll/category/category.service";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { CategoryType } from "../../bll/category/category.service";

const HomePage = () => {
  let filters = useSelector<RootStateType, string>(state => state.app.filteringOptions )

  let categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories)
  let isLoadingCategory = useSelector<RootStateType, boolean>(state => state.app.isLoadingCategory)
  let isErrorCategory = useSelector<RootStateType, string|boolean>(state => state.app.isErrorCategory)
  const [newParams, setParams] = useState('?page=1');
  const { data: realty, isLoading: isRealtyLoading, isError: isRealtyError } = useGetRealtyQuery({ params: newParams });
  // const { data: categories, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryQuery();
  // console.log("!!!!categories", categories);

  const searchHandler = (searchParams: SearchParamsType) => {
    let params = newParams;

    if (searchParams.category) {
      params = params.replace(/category=\d+/, `category=${searchParams.category}`) || `${params}&category=${searchParams.category}`;
    }
    if (searchParams.city) {
      params = params.replace(/city=\w+/, `city=${searchParams.city}`) || `${params}&city=${searchParams.city}`;
    }

    setParams(params);  // Обновляем параметры и запускаем запрос с обновлённым состоянием
  }

  const pageHandler = (current_page: number) => {
    let params = newParams;

    if (params.includes('page')) {
      params = params.replace(/page=\d+/, `page=${current_page}`);
    } else {
      console.log('!!!!!! newer');
      params = `${params}&page=${current_page}`;
    }

    setParams(params);  // Обновляем параметры для пагинации
  }
  const sortHandler = (value: string) => {
    setParams(value)
  }



  return (
    <>
      <Box className={cl.homeBg}>
        <h3 className={cl.title}>HomePage title</h3>
        {isErrorCategory && <Typography color="error"> {isErrorCategory}</Typography>}
        {isLoadingCategory && <CircularProgress />}
        {(!isLoadingCategory && !isErrorCategory && categories.length) &&
          <SearchSettings searchHandler={searchHandler} categories={categories} />}
      </Box>

      {isRealtyError && <Typography color="error">Error loading realty data</Typography>}
      {isRealtyLoading && <CircularProgress />}
      {(!isRealtyLoading && !isRealtyError && realty) &&
        <RealEstateList realty={realty} pageHandler={pageHandler} sortHandler={sortHandler} filters={filters}/>}

      <ParalaxBlock />
      <ServicesBlock />
      <BlendBlock />
    </>
  );
};

export default HomePage;
