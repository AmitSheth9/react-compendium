export default function FilterForm({types, filterChange, selectedType, setSelectedType }) {
  return (
    <div>
      <h3>Filter Pokemon!</h3>
      <select
        value={selectedType}
        onChange={e => filterChange(e.target.value)}>
        <option value='all'>All</option>
        {types.map(({type}) => (
          <option value={type} key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}
