import axiosOriginal from 'axios'

export const axios = axiosOriginal.create({
   baseURL: import.meta.env.VITE_APP_RUTA_BACK
})

export const axios_Ciu_Digital = axiosOriginal.create({
   baseURL: import.meta.env.VITE_APP_RUTA_BACK_CIU_DIGITAL
})

