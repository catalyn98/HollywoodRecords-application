import React from "react";
import TopBar from "../../components/TopBar";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import UsersStatistics from "../../components/chart/UsersStatistics";
import IncomeStatistics from "../../components/chart/IncomeStatistics";
import TopSoldProductsStatistics from "../../components/chart/TopSoldProductsStatistics";
import ProductsCategoriesStatistics from "../../components/chart/ProductsCategoriesStatistics";
import Footer from "../../components/Footer";
import "./home.css";

export default function Home() {
  return (
    <div>
      <TopBar />
      <FeaturedInfo />
      <div className="statistics-row">
        <div className="statistics-column">
          <UsersStatistics className="chart" />
          <IncomeStatistics className="chart" />
        </div>
        <div className="statistics-column">
          <TopSoldProductsStatistics />
          <ProductsCategoriesStatistics />
        </div>
      </div>
      <Footer />
    </div>
  );
}
