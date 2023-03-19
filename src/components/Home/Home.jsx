import React, { useEffect, useState } from 'react'
import './Home.css'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField/'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonIcon from '@mui/icons-material/Person';
import FingerprintIcon from '@mui/icons-material/Fingerprint';



export default function Home() {
  const [formValues, setFormValues] = useState({
    name: '',
  })
  const [vehicles, setVehicles] = useState(['Car'])
  const [gender, setGender] = useState('Male')
  const [datas, setDatas] = useState([])
  const [editID, setEditID] = useState(null)
  const [open, setOpen] = useState(false)
  const [addUser, setAddUser] = useState(false)

  const handleChange = (event) => {
    const { name, checked, value } = event.target
    if (name === 'vehicle') {
      if (checked) {
        setVehicles([...vehicles, value])
      } else {
        setVehicles(vehicles.filter((vehicle) => vehicle !== value))
      }
    } else {
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const handleGender = (e) => {
    const { name, value, checked } = e.target
    if (name === 'gender') {
      if (checked) {
        setGender(value)
      } else {
        setGender('')
      }
    }
  }

  const handleOpen = () => {
    setAddUser(true)
  }

  const handleClose = () => {
    setOpen(false)
    setAddUser(false)
  }

  const handleEdit = (id) => {
    setEditID(id)
    const userToEdit = datas.find((data) => data.id === id)
    setOpen(true)

    setFormValues({
      name: userToEdit.name,
    })
    setGender(userToEdit.gender)
    setVehicles(userToEdit.vehicles.split(','))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newData = {
      id: editID || Date.now(),
      name: formValues.name,
      gender,
      vehicles: vehicles.join(','),
    }

    const updatedDatas = editID
      ? datas.map((data) => (data.id === editID ? newData : data))
      : [...datas, newData]

    setDatas(updatedDatas)
    setFormValues({ name: '', gender })
    setVehicles(['Car'])
    setGender('Male')
    setEditID(null)
  }

  const handleDelete = (id) => {
	const updatedDatas = datas.map((data) => {
	  if (data.id === id) {
		return { ...data, deleted: true }
	  } else {
		return data
	  }
	})
	setDatas(updatedDatas)
  }

  const visibleDatas = datas.filter((data) => !data.deleted)


  useEffect(() => {
	const storedData = localStorage.getItem('data')
	if (storedData) {
	  setDatas(JSON.parse(storedData))
	}
  }, [])

  
  useEffect(() => {
	localStorage.setItem('data', JSON.stringify(datas))
	console.log('Data stored in localStorage:', JSON.stringify(datas))
  }, [datas])



  return (
    <div>
      <div className="add-user-btn">
        <Button variant="contained" endIcon={<PersonAddAltOutlinedIcon/>} style={{width:"120px",height:"40px"}} color="primary" onClick={handleOpen}>
          add user
        </Button>
      </div>
      <Dialog  open={addUser} onClose={handleClose}>
        <DialogContent >
          <Grid container className='bg-form'>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" className="header" style={{color:"white"}}>
                Add a User
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="user-form">
                <form onSubmit={handleSubmit}>
                  <div className="section">
                    <FormControl className="name">
                      <TextField
                        id="filled-basic"
                        label="Enter Your name"
                        variant="standard"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                  </div>
                  <div className="section">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Male"
                          control={<Radio color="primary" />}
                          label="Male"
                          onChange={handleGender}
                          name="gender"
                          checked={gender === 'Male'}
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio color="primary" />}
                          label="Female"
                          onChange={handleGender}
                          name="gender"
                          checked={gender === 'Female'}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="section">
                    <FormGroup>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Vehicle
                      </FormLabel>
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Car"
                        value="Car"
                        name="vehicle"
                        onChange={handleChange}
                        checked={vehicles.includes('Car')}
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Bike"
                        name="vehicle"
                        value="Bike"
                        onChange={handleChange}
                        checked={vehicles.includes('Bike')}
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Truck"
                        name="vehicle"
                        value="Truck"
                        onChange={handleChange}
                        checked={vehicles.includes('Truck')}
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Train"
                        name="vehicle"
                        value="Train"
                        onChange={handleChange}
                        checked={vehicles.includes('Train')}
                      />
                    </FormGroup>
                  </div>
                  <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
					onClick={handleClose}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Grid container className='bg-form'>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" className="header" style={{color:"white"}}>
                Edit User
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="user-form">
                <form onSubmit={handleSubmit}>
                  <div className="section">
                    <FormControl className="name">
                      <TextField
                        id="filled-basic"
                        label="Enter Your name"
                        variant="standard"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                  </div>
                  <div className="section">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Male"
                          control={<Radio color="primary" />}
                          label="Male"
                          onChange={handleGender}
                          name="gender"
                          checked={gender === 'Male'}
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio color="primary" />}
                          label="Female"
                          onChange={handleGender}
                          name="gender"
                          checked={gender === 'Female'}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="section">
                    <FormGroup>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Vehicle
                      </FormLabel>
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Car"
                        value="Car"
                        name="vehicle"
                        onChange={handleChange}
                        checked={vehicles.includes('Car')}
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Bike"
                        name="vehicle"
                        value="Bike"
                        onChange={handleChange}
                        checked={vehicles.includes('Bike')}
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Truck"
                        name="vehicle"
                        value="Truck"
                        onChange={handleChange}
                        checked={vehicles.includes('Truck')}
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Train"
                        name="vehicle"
                        value="Train"
                        onChange={handleChange}
                        checked={vehicles.includes('Train')}
                      />
                    </FormGroup>
                  </div>
                  <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleClose}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <div className="users-list">
        {visibleDatas
          ? visibleDatas.map((data) => (
              <div key={data.id} className="user-page">
                <h2><PersonIcon color='primary' style={{fontSize:"30px"}}/>{data.name}</h2>
                <h5><FingerprintIcon style={{fontSize:"20px"}}/> {data.id}</h5>
                <p>Gender : {data.gender}</p>
                <p>Transportation : {data.vehicles ? data.vehicles : "By Walk" }</p>
                <div className="button-group">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleEdit(data.id)}
                    endIcon={ <BorderColorOutlinedIcon />}
                  >Edit
                   
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(data.id)}
                    endIcon={<DeleteOutlineRoundedIcon />}
                  >Delete
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
