export interface PersonalDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  linkedin?: string
  website?: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
}

export interface Skills {
  technical: string[]
  soft: string[]
}

export interface ResumeData {
  personal: PersonalDetails
  education: Education[]
  experience: Experience[]
  skills: Skills
}
