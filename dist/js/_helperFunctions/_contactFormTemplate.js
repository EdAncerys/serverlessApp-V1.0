const _contactFormTemplate = (value, name, email, subject, description) => {
  const tableCellStyle = `style="border: 1px solid #c1c1c1;
                          color: #2b2b2b;
                          font-size: 16px;
                          font-weight: normal;
                          padding: 20px;
                          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);"`;

  return `<div style="display: grid; justify-content: center">
    <table style="background-color: #f4f4f4; min-width: 400px; margin: 20px">
      <tr>
        <th
          colspan="2"
          style="
            color: #f4f4f4;
            background: #2b2b2b;
            border: 1px solid #343a45;
            font-size: 24px;
            font-weight: 400;
            padding: 20px;
            text-align: center;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            vertical-align: middle;
          "
        >
          ${value}
        </th>
      </tr>

      <tr style="padding: 5px">
        <th
         ${tableCellStyle}
        >
          Name
        </th>
        <th
          ${tableCellStyle}
        >
          ${name}
        </th>
      </tr>
      <tr style="padding: 5px">
        <th
          ${tableCellStyle}
        >
          Email
        </th>
        <th
          ${tableCellStyle}
        >
          ${email}
        </th>
      </tr>
      <tr style="padding: 5px">
        <th
          ${tableCellStyle}
        >
          Subject
        </th>
        <th
          ${tableCellStyle}
        >
          ${subject}
        </th>
      </tr>
      <tr style="padding: 5px">
        <th
          ${tableCellStyle}
        >
          Description
        </th>
        <th
          ${tableCellStyle}
        >
          ${description}
        </th>
      </tr>
    </table>
  </div>`;
};

export { _contactFormTemplate };
