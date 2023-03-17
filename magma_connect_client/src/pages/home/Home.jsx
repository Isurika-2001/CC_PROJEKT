import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { Payment } from "../../components/payment/payment"
import { Entrepreneur, Consultant } from "../../components/search/entrepreneur"

import { UserRequests, StartupRequests, EntreprenureRequests, ConsultantRequests, DistributorRequests } from "../../components/admin/admin"
import { } from "../../components/addProducts/AddProduct"
import "./home.scss"

export const Home = () => {
  return (
    <div className="home">
      <Share/>
      <Posts/>
    </div>
  )
}

export const SearchEntrepreneur = () => {
  return (
    <div className="home">
      <Entrepreneur/>
    </div>
  )
}

export const Startuppayment = () => {
  return (
    <div className="home">
      <Payment/>
    </div>
  )
}


export const SearchConsultant = () => {
  return (
    <div className="home">
      <Consultant/>
    </div>
  )
}

export const UserReq = () => {
  return (
    <div className="home">
      <UserRequests/>
    </div>
  )
}

export const StartupReq = () => {
  return (
    <div className="home">
      <StartupRequests/>
    </div>
  )
}

export const EntrepreneurReq = () => {
  return (
    <div className="home">
      <EntreprenureRequests/>
    </div>
  )
}

export const ConsultantReq = () => {
  return (
    <div className="home">
      <ConsultantRequests/>
    </div>
  )
}

export const DistributorReq = () => {
  return (
    <div className="home">
      <DistributorRequests/>
    </div>
  )



  
}


export const EntreAddProducts = () => {
  return (
    <div className="home">
      <DistributorRequests/>
    </div>
  )



  
}




