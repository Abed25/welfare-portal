import "../general_styles/Navigation.css";
const Dropdown = ({ options, placeholder = "School links" }) => {
  const handleChange = (event) => {
    const url = event.target.value;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      event.target.selectedIndex = 0; // Reset dropdown after selection
    }
  };

  return (
    <select onChange={handleChange} className="dropDown">
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.path}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
