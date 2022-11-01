const urlAPI = "http://localhost:3333/api/admin/users";

const fetchAPI = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const allProduct = data.allProduct;
    // console.log(data.allProduct);
    generateData(allProduct);
  } catch (error) {
    console.log(error.message);
  }
};
console.log(fetchAPI(urlAPI));
const profile = document.querySelector(".profile");

const generateData = (data) => {
  const html = (value) => {
    return `
    <div class="profile-holder">
      <p>
        <span class="title">Họ tên : </span>{" "}
        ${value.firstname + " " + value.lastname}
      </p>
      <p>
        <span class="title">Email : </span> ${value.email}
      </p>
      <p>
        <span class="title">Member since : </span> ${value.createAt}
      </p>
      <p>
        <span class="title">Last update since : </span> ${value.updateAt}
      </p>
    </div>;
 `;
  };
  profile.innerHTML = html;
};
