const _contactFormTemplate = (name, email, subject, description, imgURL) => {
  const ndgLogo = imgURL;
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
                  text-align: center;
                  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                  vertical-align: middle;
                  padding: 10px;
                "
                >
                  <div style="display: grid; justify-content: center">
                    <div
                      style="
                        width: 200px;
                        height: 80px;
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-image: url(${ndgLogo});
                      "
                    >
                    ${ndgLogo}
                    </div>
                  </div>
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
