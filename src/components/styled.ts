import styled from "@emotion/styled";

export const AppContainer = styled.div``;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: whitesmoke;
  font-size: 40px;
  text-align: center;
  height: 100vh;
`;

export const HeroContent = styled.div`
  margin-bottom: 30px;
`;

export const HeroButton = styled.button`
  appearance: none;
  border: solid 4px whitesmoke;
  border-radius: 4px;
  background-color: transparent;
  font-size: 32px;
  color: whitesmoke;
  width: 200px;
  margin: 10px auto;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.5s ease;
  :hover {
    border-color: white;
    color: white;
    box-shadow: 0 12px 24px -5px rgba(0, 0, 0, 0.2);
    text-shadow: 0 12px 24px -5px rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.h1`
  font-family: Dancing Script;
  font-size: 100px;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  margin: 0px;
  margin-top 15px;
  color: #ededed;
`;

export const Sub = styled.div`
  font-size: 0.6em;
  font-weight: bolder;
  color: whitesmoke;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
`;

export const Menu = styled.div`
  background: ${props =>
    props.sticky ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  padding: 10px;
  opacity: 0.92;
  position: ${props => (props.sticky ? "sticky" : "initial")};
  top: ${props => (props.sticky ? "0" : "initial")};
  box-shadow: 0 12px 24px -5px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease-in;
`;

export const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 4px auto;
  padding: 0 8px;
`;

export const Tab = styled.div`
  display: flex;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => (props.active ? "white" : "whitesmoke")};
  background-color: ${props =>
    props.active ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  font-size: 24px;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: ${props =>
    props.active ? "none" : "0 1px 2px 2px rgba(0, 0, 0, 0.3)"};
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
  :active {
    box-shadow: none;
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
  }
  transition: color, background-color, box-shadow 0.2s ease-out;
  align-items: center;
`;

export const Page = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 12px auto;
`;

export const Section = styled.section`
  background-color: white;
  margin: 8px 12px;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 12px 24px -5px rgba(0, 0, 0, 0.3);
  min-height: 100px;
`;
