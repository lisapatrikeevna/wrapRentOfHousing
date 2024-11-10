import { Box, CircularProgress, Container, Typography } from "@mui/material";
import RealEstateList from "../../components/realty/RealEstateList";
import cl from './Home.module.scss'
import SearchSettings, { SearchParamsType } from "../../components/searchSettings/SearchSettings";
import BlendBlock from "../../components/blendBlock/BlendBlock";
import ParalaxBlock from "../../components/paralaxBlock/ParalaxBlock";
import ServicesBlock from "../../components/servisesBlock/ServicesBlock";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";
// import { useGetCategoryQuery } from "../../bll/category/category.service";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { CategoryType } from "../../bll/category/category.service";







const HomePage = () => {
  const filters = useSelector<RootStateType, string>(state => state.app.filteringOptions)
  const categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories)
  const isLoadingCategory = useSelector<RootStateType, boolean>(state => state.app.isLoadingCategory)
  const isErrorCategory = useSelector<RootStateType, string | boolean>(state => state.app.isErrorCategory)
  const additionalFilters = useSelector<RootStateType, SearchParamsType | null>(state => state.app.additionalFilters)
  const [newParams, setParams] = useState('?page=1');
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetRealtyQuery({params: newParams});
  // Сохраняем предыдущее значение additionalFilters для отслеживания изменений
  const prevFiltersRef = useRef<SearchParamsType | null>(additionalFilters);
  // const { data: categories, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryQuery();
  // console.log("!!!!categories", categories);
  console.log("homePage/filters: ", filters);
  console.log("homePage/additionalFilters: ", additionalFilters);


  useEffect(() => {
    // Функция проверки изменения значений additionalFilters
    const hasFiltersChanged = (prevFilters: SearchParamsType | null, currentFilters: SearchParamsType | null) => {
      if (!prevFilters || !currentFilters) return prevFilters !== currentFilters;

      return Object.keys(currentFilters).some(
        key => prevFilters[key] !== currentFilters[key]
      );
    };

    // Проверяем, изменилось ли значение additionalFilters
    if (hasFiltersChanged(prevFiltersRef.current, additionalFilters)) {
      searchHandler(additionalFilters || {});  // Вызов searchHandler при изменении фильтров
    }

    // Обновляем предыдущее значение после проверки
    prevFiltersRef.current = additionalFilters;
  }, [additionalFilters]);

  const searchHandler = (searchParams: SearchParamsType) => {
    console.log("homePage/searchHandler/searchParams: ", searchParams);
    let params = newParams;
    // if( searchParams.category ) {
    //   params = params.includes('category') ? params.replace(/category=\d+/, `category=${searchParams.category}`) : `${params}&category=${searchParams.category}`;
    // }
    // if( searchParams.city ) {
    //   params = params.includes('city') ? params.replace(/city=\w+/, `city=${searchParams.city}`) : `${params}&city=${searchParams.city}`;
    // }
    const paramsToInclude: Array<keyof SearchParamsType> = [
      'category',
      'location',
      'number_of_rooms',
      'available',
      'available_date',
      'class_realty',
      'square_footage'
    ];

    paramsToInclude.forEach((param) => {
      if (searchParams[param] !== undefined) {
        const paramValue = searchParams[param];
        params = params.includes(param)
          ? params.replace(new RegExp(`${param}=[^&]*`), `${param}=${paramValue}`)
          : `${params}&${param}=${paramValue}`;
      }
    });

    setParams(params);  // Обновляем параметры и запускаем запрос с обновлённым состоянием
  }

  const pageHandler = (current_page: number) => {
    let params = newParams;

    if( params.includes('page') ) {
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
  console.log("realty.data", realty?.data.length);

  return (<>
      <Box className={cl.homeBg}>
        <h3 className={cl.title}>HomePage title</h3>
        {isErrorCategory && <Typography color="error"> {isErrorCategory}</Typography>}
        {isLoadingCategory && <CircularProgress/>}
        {(!isLoadingCategory && !isErrorCategory && categories.length) && <SearchSettings searchHandler={searchHandler} categories={categories} city={additionalFilters?.location? additionalFilters.location:null}/>}
      </Box>

      {isRealtyError && <Typography color="error">Error loading realty data</Typography>}
      {isRealtyLoading && <CircularProgress/>}
      {realty?.data && realty.data.length>0 ? <RealEstateList realty={realty} pageHandler={pageHandler} sortHandler={sortHandler} filters={filters}/>
        :<Container>
          <Typography variant='h4'>Чувак ты дохрена хочешь </Typography>
          {/*<Typography variant='h4'>There are no properties with the selected parameters</Typography>*/}
          {/*<Typography>select other options</Typography>*/}
          <Typography>будь скромнее . Поменяй параметры поиска</Typography>
      </Container>}

      <ParalaxBlock/>
      <ServicesBlock/>
      <BlendBlock/>
    </>);
};

export default HomePage;
