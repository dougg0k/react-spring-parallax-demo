import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMainData, fetchMainDataSuccess } from "./actions";
import "./App.scss";
import SmallDivider from "./components/SmallDivider";
import Title from "./components/Title";
import HeroBannerContainer from "./containers/HeroBannerContainer";
import TopInformationContainer from "./containers/TopInformationContainer";
import { localData } from "./frontend-data";

class App extends React.PureComponent {
	componentDidMount() {
		this.props.actions.fetchMainDataSuccess(localData);
		this.props.actions.fetchMainData();
	}

	render() {
		const { title, cards, cta } = this.props.data;
		return (
			<>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<div className="main-container">
					<HeroBannerContainer>
						<div className="info-container">
							<Title title={title} />
							<SmallDivider />
							<TopInformationContainer cardsData={cards} buttonText={cta} />
						</div>
					</HeroBannerContainer>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.mainReducer.data
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(
			{
				fetchMainData,
				fetchMainDataSuccess
			},
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
