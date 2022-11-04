import { getDataNumReservas, getDataNumCursos, getDataNumAlumnos, getDataCursos } from '../services/services'
import VerticalBarChart from '../components/charts/VerticalBarChart'
import svgSombreroEgresado from '../assets/SombreroEgresado.svg'
import LineChart from '../components/charts/LineChart'
import PieChart from '../components/charts/PieChart'
import { userSesion } from '../services/userSesion'
import svgEstrella from '../assets/Estrella.svg'
import svgReservas from '../assets/Reservas.svg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import svgUser from '../assets/User.svg'
import { enumPermisos } from '../enum'
import './styles/Teacher.css'

function Teacher () {
  const sesion = userSesion.getInstance()
  let coursesElements: JSX.Element[] = []
  const [numReservas, setNumReservas] = useState(0)
  const [numCourses, setNumCourses] = useState(0)
  const [numStudents, setNumStudents] = useState(0)
  const [dataCourses, setDataCourses] = useState(coursesElements)
  const navigate = useNavigate()
  window.scrollTo(0, 0)
  const loadItems = (courses: any[]) => {
    coursesElements = Object.values(courses).map(course =>
      <li className='itemCouseTop' key={course.Titulo}>
        <p>#{Object.values(courses).indexOf(course) + 1} </p>
        <p>{course.Titulo}</p>
        <p>{course.Categorias}</p>
        <p>{course.NumeroDeReservas}%</p>
      </li>)
    return coursesElements
  }
  const getData = async () => {
    try {
      getDataNumReservas().then((data) => {
        setNumReservas(data.NumeroDeReservas)
      })
      getDataNumCursos().then((data) => {
        setNumCourses(data.NumeroDeCursos)
      })
      getDataNumAlumnos().then((data) => {
        setNumStudents(data.NumeroDeAlumnos)
      })
      getDataCursos().then((data) => {
        setDataCourses(loadItems(data))
      })
    } catch (err: any) {
      console.log(err.response)
    }
  }
  useEffect(() => {
    if (!sesion.isAuthorized(enumPermisos.VerAnaliticas)) {
      navigate('/', { replace: true })
    }
    getData()
  }, [])
  return (
    <div className='section'>
      <div className='dataSection'>
        <section className='analiticSection'>
          <p className='msgAlert'>Introducción a Arduino</p>
          <div className='itemContainer'>
            <div className='itemAnalitic'>
              <img src={svgReservas} alt='Imagen de reservas' />
              <p className='itemAnaliticNumber'>{numReservas}</p>
              <p className='itemAnaliticText'>Reservas</p>
            </div>
            <div className='itemAnalitic'>
              <img src={svgUser} alt='' />
              <p className='itemAnaliticNumber'>{numStudents}</p>
              <p className='itemAnaliticText'>Alumnos</p>
            </div>
            <div className='itemAnalitic'>
              <img src={svgSombreroEgresado} alt='' />
              <p className='itemAnaliticNumber'>{numCourses}</p>
              <p className='itemAnaliticText'>Cursos</p>
            </div>
            <div className='itemAnalitic'>
              <img src={svgEstrella} alt='' />
              <p className='itemAnaliticNumber'>{Math.round(numReservas / 3)}</p>
              <p className='itemAnaliticText'>Calificaciones</p>
            </div>
          </div>
        </section>

        <section className='analiticSection'>
          <p className='msgAlert'>Cursos top</p>
          <ul className='listCousesTop'>

            <li className='itemCouseTop titleCouseTop'>
              <p>#</p>
              <p>Nombre</p>
              <p>Categoria</p>
              <p>Reservas</p>
            </li>
            {dataCourses}
          </ul>
        </section>
      </div>
      <div className='chartSection'>
        <VerticalBarChart numReservas={numReservas} numCursos={numCourses} numAlumnos={numStudents} numCalificaciones={Math.round(numReservas / 3)}/>
        <LineChart />
        <PieChart />
      </div>

    </div>
  )
}
export default Teacher
