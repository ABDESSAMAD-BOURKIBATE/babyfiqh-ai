import React from 'react';
import { Unit, Step } from './data/arabic/unit1';
import { UnitTape } from './UnitTape';

interface UnitCardProps {
    unit: Unit;
    onStepClick: (step: Step) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onStepClick }) => {
    return (
        <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.07] transition-colors shadow-xl">
            <div className="mb-8 text-center md:text-right">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{unit.title}</h3>
                <p className="text-slate-300 text-lg">{unit.description}</p>
            </div>

            <UnitTape steps={unit.steps} onStepClick={onStepClick} />
        </div>
    );
};
