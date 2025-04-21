import { useTranslation } from 'react-i18next';

const DynamicTable = ({ tableData }) => {
  // Ensure the data is valid and not empty
  const { t } = useTranslation('english');
  if (
    !Array.isArray(tableData) ||
    tableData.length === 0 ||
    tableData[0] === null
  ) {
    let errorRespText =
      (tableData?.length >= 0 ? tableData : t('dataCopilot.noDataFound')) ||
      t('dataCopilot.noDataFound');
    return <p className="p-4">{errorRespText} </p>;
  }

  // Extract all unique keys from the data
  const keys = [...new Set(tableData.flatMap(Object.keys))];

  return (
    <div className="dynamicTable p-4">
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key} className=" px-4 py-2">
                  {item[key] !== undefined ? item[key] : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
