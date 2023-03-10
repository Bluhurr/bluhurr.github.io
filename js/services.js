const servicesTab = document.getElementsByClassName('big-tab')[0];
const skillsTab = document.getElementsByClassName('big-tab')[1];
const servicesContainer = document.getElementById('main-services-row');
const extraServicesContainer = document.getElementById('extra-services-row');
const skillsContainer = document.getElementById('main-skills-row');

let currentTab = 'services';

const setToServices = () => {
  currentTab = 'services';
  skillsTab.style.zIndex = 0;
  servicesTab.style.zIndex = 1;

  servicesTab.style.background = '#45b0ff';
  skillsTab.style.background = '#1465a1';
  servicesTab.firstChild.style.color = 'white';
  skillsTab.firstChild.style.color = '#00375f';

  servicesContainer.style.display = 'flex';
  extraServicesContainer.style.display = 'flex';
  skillsContainer.style.display = 'none';
};

const setToSkills = () => {
  currentTab = 'skills';
  skillsTab.style.zIndex = 1;
  servicesTab.style.zIndex = 0;

  servicesTab.style.background = '#1465a1';
  skillsTab.style.background = '#FFF0DA';
  servicesTab.firstChild.style.color = '#00375f';
  skillsTab.firstChild.style.color = '#e39300';

  servicesContainer.style.display = 'none';
  extraServicesContainer.style.display = 'none';
  skillsContainer.style.display = 'flex';
};

(currentTab === 'services') ? setToServices() : setToSkills();

servicesTab.addEventListener('click', () => {
  setToServices();
});

skillsTab.addEventListener('click', () => {
  setToSkills();
});

