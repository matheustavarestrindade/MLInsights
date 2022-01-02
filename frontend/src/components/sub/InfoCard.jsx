import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const InfoCard = ({ description, content, icon, color }) => {
    return (
        <InfoCardStyles className="col-md-4 col-12 col-sm6 col-lg-4">
            <div className="card">
                <div className="card-body">
                    <div className="icon text-center my-3 bg-secondary" style={{ color: color }}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <div className="content">
                        <h1 className="text-center fw-bold">{content}</h1>
                    </div>
                    <div className="description">
                        <p className="text-muted text-center">{description}</p>
                    </div>
                </div>
            </div>
        </InfoCardStyles>
    );
};

const InfoCardStyles = styled.div`
    .card {
        min-height: 250px;
        margin-bottom: 2rem;
        .icon {
            margin-left: auto;
            margin-right: auto;
            width: 45px;
            height: 45px;
            display: flex;
            font-size: 20px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
    }
`;

export default InfoCard;
