export const user = {
  iduser: 13,
  cpf: "90012395456",
  rg: "156523123",
  email: "suzana47@example.net",
  gender: "F",
  fullname: "Melissa Soares Jr.",
  avatar: "women/4.jpg",
  telephone: "45999881234",
};

export const appointment = {
  idappointments: 10,
  idschedule: 1,
  status: "Ativo",
  patient_iduser: user.iduser,
  professional_iduser: 2,
  rooms_idroom: 5,
  rooms_clinics_idclinics: 2,
  scheduledby_iduser: 2,
  user: user,
  schedule: {
    idschedules: 1,
    startdate: "2021-01-22 13:00:00",
    enddate: "2021-01-22 14:00:00",
    professional_iduser: 1,
    professional: {
      iduser: 1,
      cpf: "90012395456",
      rg: "156523123",
      email: "david45@example.org",
      gender: "F",
      fullname: "Srta. Maitê Feliciano Neves Sobrinho",
      avatar: "women/16.jpg",
      telephone: null,
    },
  },
};

const key = "@cis/session";

export default {
  getUserLogged: () => {
    return JSON.parse(localStorage.getItem(key));
  },
  runSimulation: () => {
    const username = localStorage.getItem(key);
    if (username === null) {
      localStorage.setItem(
        key,
        JSON.stringify({
          iduser: user.iduser,
          fullname: user.fullname,
        })
      );
    }
  },
};
