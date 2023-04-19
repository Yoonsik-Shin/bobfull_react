import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Restaurants from "./Restaurants.js";
import styled from "../../components/css/Button.module.css";
import Topnavbar from "../../../src/components/js/Topnavbar";

const CATEGORY_LIST = [
    { xs: 3, category: "한식", src: "./bibimbap.png" },
    { xs: 3, category: "일식", src: "./sushi.png" },
    { xs: 3, category: "중식", src: "./noodles.png" },
    { xs: 3, category: "양식", src: "./spaghetti.png" },
    { xs: 3, category: "분식", src: "./tteokbokki.png" },
    { xs: 3, category: "피자", src: "./pizza.png" },
    { xs: 3, category: "치킨", src: "./chicken.png" },
    { xs: 3, category: "고기", src: "./meat.png" },
    { xs: 3, category: "아시안", src: "./ricenoodles.png" },
    { xs: 3, category: "술집", src: "./liquor.png" },
    { xs: 3, category: "카페·디저트", src: "./cake.png" },
    { xs: 3, category: "패스트푸드", src: "./hamburger.png" },
    { xs: 10, category: "기타", src: "./more.png" },
];

export default function CategoryPage() {
    return (
        <div>
            <div className={styled.categorynavdiv}>
                <Topnavbar key="Category" pagename="카테고리" />
            </div>
            <Row className={styled.categoryrow}>
                {CATEGORY_LIST.map((category, index) => (
                    <Category key={index} xs={category.xs} category={category.category} src={category.src} />
                ))}
            </Row>
        </div>
    );
}

function Category(props) {
    const { xs, category, src } = props;
    return (
        <Col xs={xs} className={styled.categorydiv}>
            <Link to={`/res_index/?category=1&name=${category}`} className={styled.categoryName}>
                <img src={src} className={styled.categoryimg} />
                {category}
            </Link>
        </Col>
    );
}
