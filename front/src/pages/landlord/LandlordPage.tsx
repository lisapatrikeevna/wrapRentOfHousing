import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { RootStateType } from "../../bll/store";
import { useSelector } from "react-redux";
import { useCreateRealtyMutation, useGetRealtyQuery } from "../../bll/realty/realty.service";
import OneAd from "../../components/realty/OneAd";
import RealtyDetailForm from "../../components/newRealtyForm/RealtyDetailForm";
import { useState } from "react";
import { CreateRealtyDetailType, CreateRealtyType } from "../../bll/realty/realty.type";
import cl from './LandlordPage.module.scss'



const LandlordPage = () => {
  const id = useSelector<RootStateType, number | undefined>(state => state.app.user?.id);
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetRealtyQuery({params: `?author=${id}`});
  // console.log('id, realty',id, realty);
  const [createNew, { isError}] = useCreateRealtyMutation();
  const [newRealtyData, setNewRealtyData] = useState<CreateRealtyType | null>(null);
  const [realtyDetailData, setRealtyDetailData] = useState<CreateRealtyDetailType | null>(null);
  //@ts-ignore
  const handleNewRealtyData = (data) => {
    setNewRealtyData(data);
  };
//@ts-ignore
  const handleRealtyDetailData = (data) => {
    setRealtyDetailData(data);
  };


  const createNewRealty = () => {
    const data = new FormData();
    Object.keys(newRealtyData).forEach(key => {
      data.append(key, newRealtyData[key]);
    });

    if (realtyDetailData) {
      //@ts-ignore
      Object.keys(realtyDetailData).forEach(key => {
        data.append(`details[${key}]`, realtyDetailData[key]); // Используем квадратные скобки
      });
    }
    data.append('author', id);

    console.log("Final data to send:", [...data]); // Логируем данные для проверки

    createNew(data).unwrap()
    .then((res) => console.log("Response: ", res))
    .catch((err) => console.error("Error: ", err.errors));
  };

  return (<Box className={cl.root}>
    {/*update current objects*/}
    <Paper sx={{width: '90%', margin: '60px auto 20px', p: 2}}>
      {isError && <Typography color="error">Ошибка при создании объекта недвижимости</Typography>}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h4" gutterBottom>create new add</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NewRealtyForm onFormDataChange={handleNewRealtyData}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h4" gutterBottom>more details for add</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RealtyDetailForm onFormDataChange={handleRealtyDetailData}/>
        </AccordionDetails>
      </Accordion>
      <Button onClick={createNewRealty} disabled={!newRealtyData}> send </Button>
    </Paper>

    {isRealtyLoading && <Typography>Loading...</Typography>}
    {(!isRealtyLoading && !isRealtyError && realty?.data) && <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2-content" id="panel2-header">
        <Typography>my realty</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
          {realty.data.map(i => {return <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}> <OneAd item={i}/> </Grid> })}
        </Grid>
      </AccordionDetails>
    </Accordion>}
  </Box>);
};

export default LandlordPage;











// ------POST request.FILES: <MultiValueDict: {'real_estate_image': [<InMemoryUploadedFile: d09208183125ab47493d5de2f8710b6faa27d7cc-3000x2000.jpg (image/jpeg)>]}>
//   def create/ if serializer.is_valid():  RealtyCreateSerializer(data=<QueryDict: {'csrfmiddlewaretoken': ['6mwwAnWLyZdtpLv3wte946COY1rjTYoTveMVJ1yLiEXC9yyNFtVrDfD3tVqxlt3N'], 'price': ['239'], 'details.internet': ['yes'], 'details.garage_or_parking': ['50 e/m'], 'details.balcony': ['hren wam'], 'details.heating_type': [''], 'details.air_conditioning': ['true'], 'details.floor_number': ['2'], 'details.total_floors': ['12'], 'details.pet_friendly': ['true'], 'details.description': ['drtfyguhji tfyghuj'], 'title': ['hren tebe'], 'description': ['rftghj fgtyhuj wsdxc'], 'location': ['china'], 'number_of_rooms': ['2'], 'available': ['true'], 'available_date': ['2024-11-07'], 'class_realty': ['standard'], 'square_footage': [''], 'category': ['2'], 'author': ['1'], 'real_estate_image': [<InMemoryUploadedFile: d09208183125ab47493d5de2f8710b6faa27d7cc-3000x2000.jpg (image/jpeg)>]}>):
//   id = IntegerField(label='ID', read_only=True)
//   details = RealtyDetailSerializer(required=False):
//   id = IntegerField(label='ID', read_only=True)
//   internet = CharField(allow_blank=True, max_length=50, required=False)
//   garage_or_parking = CharField(allow_blank=True, allow_null=True, max_length=50, required=False)
//   balcony = CharField(allow_blank=True, allow_null=True, max_length=50, required=False)
//   heating_type = CharField(allow_blank=True, allow_null=True, max_length=50, required=False)
//   air_conditioning = BooleanField(required=False)
//   floor_number = IntegerField(max_value=4294967295, min_value=0)
//   total_floors = IntegerField(max_value=4294967295, min_value=0)
//   pet_friendly = BooleanField(required=False)
//   furnished = BooleanField(required=False)
//   description = CharField(allow_blank=True, allow_null=True, required=False, style={'base_template': 'textarea.html'})
//   created_at = DateTimeField(read_only=True)
//   updated_at = DateTimeField(read_only=True)
//   title = CharField(max_length=150, validators=[<UniqueValidator(queryset=Realty.objects.all())>])
//   description = CharField(label='Property description', style={'base_template': 'textarea.html'})
//   location = CharField(max_length=200)
//   price = DecimalField(decimal_places=2, max_digits=10, min_value=0)
//   number_of_rooms = IntegerField(max_value=65535, min_value=1)
//   available = BooleanField(required=False)
//   rating = FloatField(allow_null=True, help_text='min: 1, max: 5', label='Rating (1-5)', read_only=True)
//   register_date = DateField(read_only=True)
//   available_date = DateField(label='Availability date')
//   real_estate_image = ImageField(allow_null=True, label='Main real estate picture', max_length=100, required=False)
//   class_realty = ChoiceField(choices=[('standard', 'Стандарт'), ('economy', 'Эконом'), ('comfort', 'Комфорт'), ('premium', 'Премиум'), ('luxury', 'Люкс'), ('super_luxury', 'Супер-люкс')], required=False)
//   square_footage = FloatField(required=False)
//   is_deleted = BooleanField(required=False)
//   category = PrimaryKeyRelatedField(queryset=Category.objects.all())
//   author = PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=False)
//   favorite = PrimaryKeyRelatedField(allow_null=True, many=True, read_only=True)
//   views = PrimaryKeyRelatedField(allow_null=True, many=True, read_only=True)
//   reservations = PrimaryKeyRelatedField(allow_null=True, many=True, read_only=True)
//   [17/Nov/2024 15:08:49] "POST /api/realty/ HTTP/1.1" 201 18436

