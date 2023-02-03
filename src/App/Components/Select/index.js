import "./index.css";

function Select({ options, value, setValue }) {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map((option, i) => (
        <option key={i} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
