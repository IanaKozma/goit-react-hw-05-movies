import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const NavContainer = styled.nav`
   display: flex;
   gap: 30px;
   padding-bottom: 20px;
   border-bottom: 2px solid #6b6b6b;
`;

export const StyledLink = styled(NavLink)`
   padding: 8px 16px;
   border-radius: 4px;
   text-decoration: none;
   color: black;
   font-weight: 500;

   &.active {
      color: white;
      background-color: #037903;
   }
`;

export const MovieDetailContainer = styled.div`
   display: flex;
   margin-bottom: 15px;
   padding-bottom: 10px;
   padding-top: 15px;
   border-bottom: 2px solid black;
`;

export const DescriptionContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 18px;
   margin-bottom: 15px;
   padding-bottom: 10px;
   padding-left: 10px;
   padding-top: 15px;
   max-width: 600px;
   
   h3 {
      margin-bottom: 10px;
   }
`;

export const MoviesContainer = styled.ul`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 5px;

   li {
      display: block;
      min-width: 600px;
      text-align: center;
      padding: 10px;
      border: 1px solid black;
      border-radius: 4px;
      background-color: azure;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
         0px 4px 5px 0px rgba(0, 0, 0, 0.14),
         0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      :hover {
         scale: 1.1;
      }

      a {
         margin-left: auto;
         margin-right: auto;
         padding-top: 10px;
         padding-bottom: 10px;
         text-decoration: none;
         font-size: large;
         font-weight: 500;
         color: black;
         :hover,
         :active {
            color: #5307aa;
         }
      }
   }
`;