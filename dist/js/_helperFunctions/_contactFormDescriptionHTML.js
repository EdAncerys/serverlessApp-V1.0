const _contactFormDescriptionHTML = (
  value,
  name,
  email,
  subject,
  description
) => {
  return ` <div style="padding: 30px">
  <table>
    <tr>
      <th
        colspan="2"
        style="
          color: #d5dde5;
          background: #1b1e24;
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
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Name
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${name}
      </th>
    </tr>
    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Email
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${email}
      </th>
    </tr>
    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Subject
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${subject}
      </th>
    </tr>
    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Description
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${description}
      </th>
    </tr>
  </table>
</div>`;
};

export { _contactFormDescriptionHTML }; // a list of exported variables
